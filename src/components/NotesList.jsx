import React from 'react'

export const NotesList = ({notes = [], selected, onSelect}) => {    
    return <div className="list-group">
        {notes.map((note) => (
            <div 
            key={note?.id} 
            data-testid="note-item" 
            className={`list-group-item ${selected && selected.id === note.id ? 'active' : ''}`}
            onClick={() => onSelect(note)}
            >
                {note?.title}
            </div>
        ))}
    </div>
}
