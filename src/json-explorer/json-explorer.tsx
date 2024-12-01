import { Fragment } from 'react';
import './json-explorer.css';

type Value = boolean | number | string | object | [];
interface Props<T extends Record<string, Value>> {
    jsonObject: T;
}

export default function JsonExplorer<T extends Record<string, Value>>({ jsonObject }: Props<T>) {
    return (
        <article className="json-explorer">
            <form name="json-explorer" className="form">
                <div className="form-input">
                    <label htmlFor="property">Property</label>
                    <input type="text" name="property" placeholder="Property" />
                </div>
                <p className="property-value">
                    Property Value
                </p>
            </form>

            <section>
                <p><strong>Response</strong></p>
                <pre role="document" aria-label="JSON Data" className="json-content">
                    {Object.getOwnPropertyNames(jsonObject).map((property, index) => {
                        return <Fragment key={index}>
                            {property}: {`${jsonObject[property].toString()}\n`}
                        </Fragment>
                    })}
                </pre>
            </section>
        </article>
    );
}