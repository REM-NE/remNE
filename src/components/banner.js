import banner from '../assets/images/recursos-banner.jpeg';

export default function Banner({ title }) {
    return (
        <div className="w-100 h-30">
            <img src={banner} className="w-100" alt="..." style={{ height: "496px", objectFit: "cover" }} />
            <h1 className="banner-text">{title}</h1>
        </div>
    )
}