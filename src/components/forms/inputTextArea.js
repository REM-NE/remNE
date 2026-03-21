// Para textos maiores

export default function InputTextArea({ label, data, setData, property, isANewDoc, disabled }) {
    const handleChangeItem = (id, property, value) => {
        if (!isANewDoc) {
            setData((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, [property]: value }
                        : item
                )
            );
        } else {
            setData({ ...data, [property]: value });
        }
    };

    return <div className="mb-3" >
        <label>{label}:</label>
        <textarea
            className="form-control"
            rows={4}
            value={data[property]}
            disabled={disabled}
            onChange={(e) => {
                handleChangeItem(data.id, property, e.target.value);
            }}
        ></textarea>
    </div >;
}