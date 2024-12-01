import './json-explorer.css';

interface Props {
    jsonObject: object;
}

export default function JsonExplorer({ jsonObject }: Props) {
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
                <pre className="json-content">
                    {jsonObject.toString()}
                </pre>
            </section>
        </article>
    );
}