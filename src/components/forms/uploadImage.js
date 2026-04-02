

export default function UploadImage({ label, data, setData, isANewDoc, disabled }) {
    const handleChangeItem = (id, value) => {
        if (!isANewDoc) {
            setData((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, imageURL: value }
                        : item
                )
            );
        } else {
            setData({ ...data, imageURL: value });
        }
    };

    return <div className="mb-3 image-upload-box" >
        <label>{label}:</label>
        {data.imageURL && <img src={data.imageURL} alt="Preview" className="mb-2" style={{ maxWidth: "200px", height: "auto" }} />}
        <input
            type="file"
            className="form-control"
            disabled={disabled}
            onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const preview = URL.createObjectURL(file);
                handleChangeItem(data.id, preview);
            }}
        />
    </div >;
}