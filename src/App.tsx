import JsonExplorer from './json-explorer/json-explorer';

function App() {
  const demoData = {
    date: '2021-10-27T07:49:14.896Z',
    hasError: false,
    fields: [
      {
        id: '4c212130',
        prop: 'iban',
        value: 'DE81200505501265402568',
        hasError: false
      }
    ]
  };

  return <main><JsonExplorer jsonObject={demoData} /></main>
}

export default App
