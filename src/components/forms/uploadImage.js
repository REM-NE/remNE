export default function UploadImage({ label, data, setData, isANewDoc, disabled }) {

    const handleChangeItem = (id, preview, file) => {
        setData((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, imageURL: preview, imageFile: file }
                    : item
            )
        );
    };

    return (
        <div className="mb-3 image-upload-box">
            <label>{label}:</label>

            {data.imageURL && (
                <img
                    src={data.imageURL}
                    alt="Preview"
                    className="mb-2"
                    style={{ maxWidth: "200px", height: "auto" }}
                />
            )}

            <input
                type="file"
                className="form-control"
                disabled={disabled}
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const preview = URL.createObjectURL(file);

                    if (isANewDoc) {
                        setData((prev) => ({
                            ...prev,
                            imageURL: preview,
                            imageFile: file
                        }));
                    } else {
                        handleChangeItem(data.id, preview, file);
                    }
                }}
            />
        </div>
    );
}