import JsonExplorer from './json-explorer/json-explorer';

function App() {
  const demoData = {
    date: '2021-10-27T07:49:14.896Z',
    hasError: false,
    aNumber: 123,
    nothing: null,
    fields: [
      {
        id: '4c212130',
        prop: 'iban',
        value: 'DE81200505501265402568',
        hasError: false
      }
    ],
    something: {
      id: '123',
      nestedObject: {
        id: '456'
      }
    },
    nestedArray: [1, 2, 3, [4, 5, 6]]
  };

  return <main><JsonExplorer jsonObject={demoData} /></main>
}

export default App
