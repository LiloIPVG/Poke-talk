import './list.css'

export default function List() {

  return (
    <>
      <header><h1>Poke-talk</h1></header>
      <section id="pokeList">
        <div>
          <img src="" alt="" id='like'/>
          <img src="" alt="" />
          <h2>Nombre del pokemon</h2>
          <button id="chat">Conversar</button>
        </div>
      </section>
      <footer>
        <button id="prev">Previous Page</button>
        <p id="pagCount">a</p>
        <button id="next">Next Page</button>
    </footer>
    </>
  )
}

