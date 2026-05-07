export default function Banner({ title, image }) {
    return (
        <div className="w-100 h-30">
            <img src={image} className="w-100 banner-image" alt="..." />
            <h1 className="banner-text">{title}</h1>
        </div>
    )
}