export default function Banner({ title, image }) {
    return (
        <div className="banner-shell">
            <img src={image} className="w-100 banner-image" alt="..." />
            <div className="banner-overlay">
                <h1 className="banner-text">{title}</h1>
            </div>
        </div>
    )
}