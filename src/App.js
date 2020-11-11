import React from 'react';
import './App.css';
import Book from './book/book';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: '',
      sort: '',
      error: null
    }
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { search, sort} = this.state;
    const baseUrl = 'http://localhost:8000/books';
    const params = [];
    if(search){
      params.push(`search=${search.toLowerCase()}`);
    }
    if(sort) {
      params.push(`sort=${sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;
    fetch(url)
      .then(res => res.ok ? res.json() : Error(res.statusText))
      .then(data => {
        this.setState({
          books: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get books at this time.'
        });
      })
  }

  render() {
    const books = this.state.books.map((book, i) => {
      return <Book {...book} key={i} />
    })
    return (
      <main className='App'>
        <h1>NYT Best Sellers</h1>
        <div className='search'>
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor='search'>Search: </label>
            <input
              type='text'
              id='search'
              name='search'
              value={this.state.search}
              onChange={e => this.setSearch(e.target.value)}
            />
            
            <label htmlFor='sort'>Sort: </label>
            <select id='sort' name='sort' onChange={e => this.setSort(e.target.value)}>
              <option value=''>None</option>
              <option value='title'>Title</option>
              <option value='rank'>Rank</option>
            </select>
            <button type='submit'>Search</button>
          </form>
          <div className='App_error'>{this.state.error}</div>
        </div>
        {books}
      </main>
    );
  }
}

export default App;
