import { Link } from 'react-router-dom';
// ...existing code...

function Home() {
    return (
        <div>
            // ...existing code...
            <button>
                <Link to="/demo">Try Demo</Link>
            </button>
            // ...existing code...
        </div>
    );
}

export default Home;
