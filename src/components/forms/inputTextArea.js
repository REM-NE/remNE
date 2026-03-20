// Para textos maiores

export default function InputTextArea({ label, data, setData, property, disabled }) {
    return <div className="mb-3" >
        <label>{label}:</label>
        <textarea
            className="form-control"
            rows={4}
            value={data[property]}
            disabled={disabled}
            onChange={(e) => {
                setData({ ...data, [property]: e.target.value });
            }}
        ></textarea>
    </div >;
}