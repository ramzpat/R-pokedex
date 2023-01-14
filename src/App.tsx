import React, {useState, useEffect}from 'react';
import './App.css';
import Pokedex from 'pokedex-promise-v2';
import Div100vh from 'react-div-100vh';
const P = new Pokedex();

function App() {

  const SearchBox:React.FC = () => {
    return (
      <div id="search_box">
        Search box
      </div>
    )
  };

  interface pokemon_info_t {
    name:string;
  };
  
  const [pkm_list, setPokeList] = useState<pokemon_info_t[]>([{name:"test"}]);
  useEffect(() => {
    const getPokemons = async () => {
      let _pkm_list:pokemon_info_t[] = []
      let n = 50;
      for(let i=1; i<=n;i++) {
        _pkm_list.push({name:"loading"})
        let res = await P.getPokemonByName(i);
        _pkm_list[i-1] = {name:res.name};
      }
      setPokeList(_pkm_list);
    }
    getPokemons();
  },[]) 

  const PokemonList:React.FC<{pokemon_list:pokemon_info_t[]}> = ({pokemon_list}) => {
    return (
      <div id="pokemon_list">
        {
          pokemon_list.map(
            (pokemon_info, index) => (
              <div 
                key={index}
                className="pokemon_brief_info"
                >
                <div>
                  {pokemon_info.name}
                </div>
              </div>
            )
          )
        }
      </div>
    )
  };



  return (
    <div className="App">
      <div className="App-header">
        <PokemonList pokemon_list={pkm_list} />
        <SearchBox />
      </div>
    </div>
  );
}

export default App;
