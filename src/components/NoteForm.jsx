import React from 'react'

export const NoteForm = ({note = { title: '', text: '' }, onChange, onSubmit, onCancel }) => {

    const handleChange = (e) => {
        const {name, value} = e.target;
        onChange({...note, [name]: value})
    }

    const handleSubmit  = (e) => {
        e.preventDefault()
        onSubmit(note);
    }

    return <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Title:</label>
            <input
                className="form-control"
                data-testid="input-title"
                name="title"
                value={note?.title}
                onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label>Note:</label>
            <textarea
                className="form-control"
                data-testid="input-text"
                name="text"
                value={note?.text}
                onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <input
                type="button"
                data-testid="cancel-note"
                className="btn btn-default pull-right"
                value="Cancel"
                onClick={onCancel}
            />
            <input
                type="submit"
                data-testid="save-note"
                className="btn btn-default pull-right"
                value="Save"
            />
        </div>
    </form>
}
