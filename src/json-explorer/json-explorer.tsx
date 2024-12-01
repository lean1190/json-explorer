import './json-explorer.css';
import { printProperty } from './print';
import { JsonObject } from './types';

interface Props<T extends JsonObject> {
  jsonObject: T;
}

export default function JsonExplorer<T extends JsonObject>({ jsonObject }: Props<T>) {
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
