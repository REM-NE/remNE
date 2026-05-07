export default function Banner({ title, image }) {
    return (
        <div className="w-100 top-spacing h-30">
            <img src={image} className="w-100" alt="..." style={{ height: "496px", objectFit: "cover" }} />
            <h1 className="banner-text">{title}</h1>
        </div>
    )
}