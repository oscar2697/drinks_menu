
const Loader = () => {
    return (
        <div className="flex justify-center items-center space-x-2">
            <div className="h-4 w-4 bg-blue-600 rounded-full animate-spin"></div>
            <div className="h-4 w-4 bg-blue-600 rounded-full animate-spin" style={{ animationDelay: '200ms' }}></div>
            <div className="h-4 w-4 bg-blue-600 rounded-full animate-spin" style={{ animationDelay: '400ms' }}></div>
        </div>
    );
}

export default Loader;
