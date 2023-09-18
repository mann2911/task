import Disperse from "./components/Disperse";

function App() {
  const data=['0x2CB99F193549681e06C6770dDD5543812B4FaFE8 10','0x2CB99F193549681e06C6770dDD5543812B4FaFE8 5','0x09ae5A64465c18718a46b3aD946270BD3E5e6aaB 401','0x09ae5A64465c18718a46b3aD946270BD3E5e6aaB 34']
 
  return (
    <>
      <Disperse data={data}/>
    </>
  );
}

export default App;
