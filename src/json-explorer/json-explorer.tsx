import { useMemo, useState } from 'react';
import './json-explorer.css';
import { printProperty } from './print';
import { JsonObject } from './types';
import { extractNestedValue } from './extract';

interface Props<T extends JsonObject> {
  jsonObject: T;
}

export default function JsonExplorer<T extends JsonObject>({ jsonObject }: Props<T>) {
  const [typedPropertyAccessor, setTypedPropertyAccessor] = useState<string>('');

  const accessedPropertyValue = useMemo(() => {
    return extractNestedValue(jsonObject, typedPropertyAccessor)?.toString() ?? 'undefined';
  }, [jsonObject, typedPropertyAccessor]);

  return (
    <article className="json-explorer">
      <form name="json-explorer" className="form">
        <div className="form-input">
          <label htmlFor="property">Property</label>
          <input
            type="text"
            name="property"
            placeholder="Property"
            value={typedPropertyAccessor}
            onChange={(event) => setTypedPropertyAccessor(event.target.value)}
          />
        </div>
        <p className="property-value">
          {accessedPropertyValue}
        </p>
      </form>

      <section>
        <p><strong>Response</strong></p>
        <pre role="document" aria-label="JSON Data" className="json-content">
          {Object
            .getOwnPropertyNames(jsonObject)
            .map((propertyName) => (
              <span key={propertyName}>
                {printProperty({
                  value: jsonObject[propertyName],
                  propertyName
                })}
              </span>))
          }
        </pre>
      </section>
    </article>
  );
}
