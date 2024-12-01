import './json-explorer.css';

type Value = boolean | number | string | object | [];
type JsonObject = Record<string, Value>;
interface Props<T extends JsonObject> {
    jsonObject: T;
}

interface Print {
    value: Value,
    propertyName: string,
    spaces: number
}

const getSpaceCharacters = (spaces: number): string => Array.from<string>({ length: spaces }).reduce((acc) => `${acc} `, '');

const printPrimitiveProperty = ({ value, propertyName, spaces }: Print): string => {
    const isString = typeof value === 'string';

    return getSpaceCharacters(spaces) +
        (propertyName ? `${propertyName}: ` : '') +
        (isString ? `'${value.toString()}'` : value.toString()) +
        ',\n';
}

const printArrayProperty = ({
    value,
    propertyName,
    spaces
}: (Print & { value: Value[] })): string => {
    return `${getSpaceCharacters(spaces)}${propertyName}: [\n` +
        value.reduce((acc, current) => `${acc}${printProperty({
            value: current,
            spaces: spaces + 2
        })}\n`, '') +
    '],\n';
}

const printObjectProperty = ({
    value,
    propertyName,
    spaces
}: (Print & { value: JsonObject })): string => {
    const spaceCharacters = getSpaceCharacters(spaces);
    return spaceCharacters +
        (propertyName ? `${propertyName}: ` : '') +
        (`{\n`) +
        Object
            .getOwnPropertyNames((value))
            .reduce((acc, property) => `${acc}${printProperty({
                value: (value as JsonObject)[property],
                propertyName: property,
                spaces: spaces + 2
            })}`, '') +
        (`${spaceCharacters}},`);
}

const printProperty = ({
    value,
    propertyName = '',
    spaces = 0
}: (Partial<Print> & Pick<Print, 'value'>)): string => {
    if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
        return printPrimitiveProperty({ value, propertyName, spaces });
    }

    if (Array.isArray(value)) {
        return printArrayProperty({ value, propertyName, spaces });
    }

    if (typeof value === 'object') {
        return printObjectProperty({
            value: value as JsonObject,
            propertyName,
            spaces
        });
    }

    return 'Unexpected data type';
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
                    {Object
                        .getOwnPropertyNames(jsonObject)
                        .reduce((acc, propertyName) => `${acc}${printProperty({
                            value: jsonObject[propertyName],
                            propertyName
                        })}`, '')
                    }
                </pre>
            </section>
        </article>
    );
}
