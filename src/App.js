import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(); // not meant to be changed, only here if we want to reset the list
  const [displayedData, setDisplayedData] = useState(); // the displayed rows; changes based on sorting and filters
  const [selectedColumn, setSelectedColumn] = useState('NAME'); // which column is selected for sorting and highlighting

  useEffect(() => {
     fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
      .then(res => res.json())
      .then(fetchedData => {
        fetchedData = fetchedData.filter(entry => !!entry.year); // empty years break the app
        fetchedData.forEach(entry => entry.year = entry.year.slice(0,4)); // remove the junk after the year
        setData(fetchedData);
        setDisplayedData(fetchedData);
      });
  }, []);

  const handleFilterFormSubmit = e => {
    e.preventDefault();
    let tempData = [...data];
    const name = e.target.name.value;
    const id = e.target.id.value;
    const year1 = e.target.year_one.value;
    const year2 = e.target.year_two.value;
    const recclass = e.target.recclass.value;

    if(!!id) {
      tempData = tempData.filter(entry => entry.id === id);
    }

    if(!!recclass) {
      tempData = tempData.filter(entry => entry.recclass.toLowerCase().includes(recclass.toLowerCase()));
    }

    if(!!name) {
      tempData = tempData.filter(entry => entry.name.toLowerCase().includes(name.toLowerCase()));
    }

    if(!!year1 !== !!year2) {
      alert("Please enter both year fields");
      return;
    }

    else if(year2 < year1) {
      alert("Year 2 must be greater than or equal to Year 1");
      return;
    }

    else if(!!year1 && !!year2) {
      tempData = tempData.filter(entry => parseInt(entry.year) >= parseInt(year1) && parseInt(entry.year) <= parseInt(year2));
    }

    setDisplayedData(tempData);
  }

  const handleNameClick = () => {
    setSelectedColumn('NAME');
    const allCells = document.querySelectorAll('th, td');
    const selectedCells = document.querySelectorAll('th[column="name"], td[column="name"]');
    setDisplayedData(displayedData.sort((a,b) => a.name.localeCompare(b.name)));
    allCells.forEach(cell => cell.setAttribute("highlighted", "false"));
    selectedCells.forEach(cell => cell.setAttribute("highlighted", "true"));
  };

  const handleIdClick = () => {
    setSelectedColumn('ID');
    const allCells = document.querySelectorAll('th, td');
    const selectedCells = document.querySelectorAll('th[column="id"], td[column="id"]');
    setDisplayedData(displayedData.sort((a,b) => a.id - b.id));
    allCells.forEach(cell => cell.setAttribute("highlighted", "false"));
    selectedCells.forEach(cell => cell.setAttribute("highlighted", "true"));
  };

  const handleRecclassClick = () => {
    setSelectedColumn('RECCLASS');
    const allCells = document.querySelectorAll('th, td');
    const selectedCells = document.querySelectorAll('th[column="recclass"], td[column="recclass"]');
    setDisplayedData(displayedData.sort((a,b) => a.recclass.localeCompare(b.recclass)));
    allCells.forEach(cell => cell.setAttribute("highlighted", "false"));
    selectedCells.forEach(cell => cell.setAttribute("highlighted", "true"));
  };

  const handleMassClick = () => {
    setSelectedColumn('MASS');
    const allCells = document.querySelectorAll('th, td');
    const selectedCells = document.querySelectorAll('th[column="mass"], td[column="mass"]');
    setDisplayedData(displayedData.sort((a,b) => a.mass - b.mass));
    allCells.forEach(cell => cell.setAttribute("highlighted", "false"));
    selectedCells.forEach(cell => cell.setAttribute("highlighted", "true"));
  };

  const handleYearClick = () => {
    setSelectedColumn('YEAR');
    const allCells = document.querySelectorAll('th, td');
    const selectedCells = document.querySelectorAll('th[column="year"], td[column="year"]');
    setDisplayedData(displayedData.sort((a,b) => a.year.localeCompare(b.year)));
    allCells.forEach(cell => cell.setAttribute("highlighted", "false"));
    selectedCells.forEach(cell => cell.setAttribute("highlighted", "true"));
  };

  const handleReclatClick = () => {
    setSelectedColumn('RECLAT');
    const allCells = document.querySelectorAll('th, td');
    const selectedCells = document.querySelectorAll('th[column="reclat"], td[column="reclat"]');
    setDisplayedData(displayedData.sort((a,b) => a.reclat - b.reclat));
    allCells.forEach(cell => cell.setAttribute("highlighted", "false"));
    selectedCells.forEach(cell => cell.setAttribute("highlighted", "true"));
  };

  const handleReclongClick = () => {
    setSelectedColumn('RECLONG');
    const allCells = document.querySelectorAll('th, td');
    const selectedCells = document.querySelectorAll('th[column="reclong"], td[column="reclong"]');
    setDisplayedData(displayedData.sort((a,b) => a.reclong - b.reclong));
    allCells.forEach(cell => cell.setAttribute("highlighted", "false"));
    selectedCells.forEach(cell => cell.setAttribute("highlighted", "true"));
  };

  return (
    <div className="App">
      {
        !displayedData ? <span>Loading...</span>
          :
          <>
            <form className="filter-form" onSubmit={handleFilterFormSubmit} action="">
              <label>Name contains: 
                <input name="name" />
              </label>
              <label>Id equals: 
                <input name="id" type="number" />
              </label>
              <label>Year is between: 
                <input name="year_one" type="number" min="0" step="1" />
              </label>
              <label> and 
                <input name="year_two" type="number" min="0" step="1" />
              </label>
              <label>Recclass contains: 
                <input name="recclass" />
              </label>
              <input type="submit" value="Click to filter"></input>
            </form>
            
            <table>
              <thead>
                <tr>
                  <th column="name" onClick={handleNameClick} highlighted="true">Name</th>
                  <th column="id" onClick={handleIdClick}>Id</th>
                  <th column="recclass" onClick={handleRecclassClick}>Recclass</th>
                  <th column="mass" onClick={handleMassClick}>Mass</th>
                  <th column="year" onClick={handleYearClick}>Year</th>
                  <th column="reclat" onClick={handleReclatClick}>Reclat</th>
                  <th column="reclong" onClick={handleReclongClick}>Reclong</th>
                </tr>
              </thead>
              <tbody>
                {
                  displayedData.map((entry, key) => (
                    <tr key={entry.id}>
                      <td column="name" highlighted={`${selectedColumn === 'NAME'}`}>{entry.name}</td>
                      <td column="id" highlighted={`${selectedColumn === 'ID'}`}>{entry.id}</td>
                      <td column="recclass" highlighted={`${selectedColumn === 'RECCLASS'}`}>{entry.recclass}</td>
                      <td column="mass" highlighted={`${selectedColumn === 'MASS'}`}>{entry.mass}</td>
                      <td column="year" highlighted={`${selectedColumn === 'YEAR'}`}>{entry.year}</td>
                      <td column="reclat" highlighted={`${selectedColumn === 'RECLAT'}`}>{entry.reclat}</td>
                      <td column="reclong" highlighted={`${selectedColumn === 'RECLONG'}`}>{entry.reclong}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </>
      }
    </div>
  );
}

export default App;
