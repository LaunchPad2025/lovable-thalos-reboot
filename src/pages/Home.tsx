import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <button>
                <Link to="/demo">Try Demo</Link>
            </button>
        </div>
    );
}

export default Home;
