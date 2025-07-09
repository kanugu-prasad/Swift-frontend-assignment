import { Component } from "react"
import EachComment from "../EachComment"
import PaginationControls from '../PaginationControls';
import "./index.css"
class Comments extends Component {
    state = {
        comments: [],
        filteredComments: [],
        page: Number(localStorage.getItem('page')) || 1,
        pageSize: Number(localStorage.getItem('pageSize')) || 10,
        search: localStorage.getItem('search')||"",
        sortBy: localStorage.getItem('sortBy') || '',
        sortOrder: localStorage.getItem('sortOrder') || '',
    };

    componentDidMount() {
        try {
            const corrupted = localStorage.getItem('sortBy');
            if (corrupted && corrupted.length > 50) {
                localStorage.removeItem('sortBy');
            }
        } catch (e) {
            console.warn('Error reading localStorage');
        }

        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => res.json())
            .then(data => {
            this.setState({ comments: data }, this.applyFilters);
        });
    }
    
    componentDidUpdate(_, prevState) {
        if (
            prevState.search !== this.state.search ||
            prevState.page !== this.state.page ||
            prevState.pageSize !== this.state.pageSize ||
            prevState.sortBy !== this.state.sortBy ||
            prevState.sortOrder !== this.state.sortOrder
            ) {
            this.applyFilters();
        }
    }

    
    applyFilters = () => {
    let filtered = [...this.state.comments];
    const { search, sortBy, sortOrder } = this.state;

    if (search) {
        filtered = filtered.filter(c =>
        c.name.includes(search) ||
        c.email.includes(search) ||
        c.body.includes(search)
        );
    }

    if (sortBy) {
        filtered.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
        });
    }

    try {
        localStorage.setItem('page', String(this.state.page));
        localStorage.setItem('pageSize', String(this.state.pageSize));

        if (this.state.search.length < 200) {
        localStorage.setItem('search', this.state.search);
        } else {
        console.warn('Search string too long, not saved to localStorage.');
        localStorage.removeItem('search');
        }

        localStorage.setItem('sortBy', this.state.sortBy || '');
        localStorage.setItem('sortOrder', this.state.sortOrder || '');
    } catch (e) {
        console.warn('⚠️ localStorage quota exceeded. Clearing heavy keys.');
        localStorage.removeItem('search');
    }

    this.setState({ filteredComments: filtered });
    };


    handleSearch = e => {
        this.setState({ search: e.target.value, page: 1 });
    };

    

    handleSort = column => {
        const { sortBy, sortOrder } = this.state;
        let newOrder = 'asc';
        let newSortBy = column;

        if (sortBy === column && sortOrder === 'asc') {
            newOrder = 'desc';
        } else if (sortBy === column && sortOrder === 'desc') {
            newSortBy = '';
            newOrder = '';
        }
        this.setState({ sortBy: newSortBy, sortOrder: newOrder });
    };




    handlePageChange = newPage => this.setState({ page: newPage });

    handlePageSizeChange = e => this.setState({ pageSize: Number(e.target.value), page: 1 })

    render(){
        const { filteredComments, page, pageSize, search, sortBy, sortOrder } = this.state;
        const startIndex = (page - 1) * pageSize;
        const paginatedData = filteredComments.slice(startIndex, startIndex + pageSize);
        const totalPages = Math.ceil(filteredComments.length / pageSize);
        return(
            <div className="comment-container">
                <h1 className="comment-title">Comments Dashboard</h1>
                <p className="comment-para">Manage and explore user comments with advanced filtering</p>
                <div className="search-page-container">
                    <input placeholder="Search by name, email, comment" 
                        className="search" 
                        type="text"
                        value={search}
                        onChange={this.handleSearch}
                    />
                    <PaginationControls
                        currentPage={page}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        onPageSizeChange={this.handlePageSizeChange}
                    />
                                         
                </div>
                <table className="table-container">
                    <thead>
                        <tr >
                            <th className="each-table-style" onClick={() => this.handleSort('postId')}>Post ID {sortBy === 'postId' ? sortOrder : ''}</th>
                            <th className="each-table-style" onClick={() => this.handleSort('name')}>Name {sortBy === 'name' ? sortOrder : ''}</th>
                            <th className="each-table-style" onClick={() => this.handleSort('email')}>Email {sortBy === 'email' ? sortOrder : ''}</th>
                            <th className="each-table-style">COMMENT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map(each=><EachComment eachDetails={each} key={each.id}/>)}
                    </tbody>
                </table>
                               
                            
                
            </div>
        )
    }
}

export default Comments