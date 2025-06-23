function Footer({currentPage, setCurrentPage, isSearching, totalPages }) {
    if (isSearching) return null
    return (
      <footer>
        <button
          id="prev"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Página anterior
        </button>
        <p id="pagCount">{currentPage}/{totalPages}</p>
        <button
          id="next"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente página
        </button>
      </footer>
    )
}


export default Footer