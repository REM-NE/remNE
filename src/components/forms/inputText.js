// Para textos pequenos

export default function InputText({ label, data, setData, property, disabled }) {
    console.log("InputText renderizado com data:", data);
    return <div className="mb-3" >
        <label>{label}:</label>
        <input
            type="text"
            className="form-control"
            value={data[property]}
            disabled={disabled}
            onChange={(e) => {
                setData({ ...data, [property]: e.target.value });
            }}
        />
    </div >;
}