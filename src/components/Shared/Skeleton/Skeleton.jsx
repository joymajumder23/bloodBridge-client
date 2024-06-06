const Skeleton = () => {
    return (
        <div>
            <div className="flex flex-col gap-4 w-full">
                <div className="skeleton h-62 w-full"></div>
                <div className="skeleton h-24 w-28"></div>
                <div className="skeleton h-24 w-full"></div>
                <div className="skeleton h-24 w-full"></div>
            </div>
        </div>
    );
};

export default Skeleton;