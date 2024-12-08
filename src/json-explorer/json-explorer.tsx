import './json-explorer.css';
import { JsonObject } from './types';
import Property from './components/property';
import useJsonExplorer from './hooks/use-json-explorer';

interface Props {
  jsonObject: JsonObject;
}

export default function JsonExplorer({ jsonObject }: Props) {

  const {
    typedPropertyAccessor,
    accessedPropertyValue,
    setTypedPropertyAccessor,
    onPropertyClicked
  } = useJsonExplorer();

  return (
    <article className="json-explorer">
      <h1>JSON Explorer</h1>

      <form name="json-explorer" className="form">
        <div className="form-input">
          <label htmlFor="property">Property</label>
          <input
            type="text"
            id="property"
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
          <Property
            print={{ value: jsonObject }}
            path="res"
            onPropertyClicked={onPropertyClicked}
          />
        </pre>
      </section>
    </article>
  );
}
