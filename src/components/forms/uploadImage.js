export default function UploadImage({
    label,
    data,
    setData,
    isANewDoc,
    disabled,
    isArray = false,
    index = null
}) {

    const handleChangeItem = (id, preview, file) => {
        setData((prev) =>
            prev.map((item) => {
                if (item.id !== id) return item;

                if (isArray) {
                    const updatedImages = [...item.images];

                    updatedImages[index] = {
                        ...updatedImages[index],
                        imageURL: preview,   // preview só pra tela
                        imageFile: file      // 🔥 arquivo real
                    };

                    return {
                        ...item,
                        images: updatedImages
                    };
                }

                return {
                    ...item,
                    imageURL: preview,
                    imageFile: file
                };
            })
        );
    };

    const imageSrc = isArray
        ? data.images?.[index]?.imageURL
        : data.imageURL;

    return (
        <div className="mb-3 image-upload-box">
            <label>{label}:</label>

            {imageSrc && (
                <img
                    src={imageSrc}
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
                        if (isArray) {
                            const updatedImages = [...data.images];

                            updatedImages[index] = {
                                ...updatedImages[index],
                                imageURL: preview,
                                imageFile: file
                            };

                            setData({
                                ...data,
                                images: updatedImages
                            });
                        } else {
                            setData({
                                ...data,
                                imageURL: preview,
                                imageFile: file
                            });
                        }
                    } else {
                        handleChangeItem(data.id, preview, file);
                    }
                }}
            />
        </div>
    );
}