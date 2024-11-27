import React, { useState, useEffect } from 'react'

import { NotesList } from './NotesList'
import { NoteForm } from './NoteForm'

export const App = ({service}) => {

    const [notes, setNotes] = useState([])
    const [selected, setSelected] = useState(null)
    const [activeNote, setActiveNote] = useState(null)

    // (!) Get notes from service
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await service.getNotes()
                setNotes(res)
            } catch (error) {
                console.error('Error: ', error?.message)
            }
        }
        fetchNotes()
    }, [service])

    // Select new empty note
    function newNote(){
        setSelected({
            "title": "",
		    "text": ""
        })
    }

    // Set note as selected
    function onSelect(note){
        setSelected(note)
    }

    // Save note to service
    const onSubmit = async (note) => {
        const savedNote = await service.saveNote(note)
        setNotes((prev) => {
            const isExisting = prev.some(n => n.id === savedNote.id)
            return isExisting 
                ? prev.map((n) => (n.id === savedNote.id ? savedNote : n)) // Actualizar
                : [...prev, savedNote]
        })
        setSelected(null)
    }

    // Unselect note
    function onCancel(){
        setSelected(null)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>React notes</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <NotesList 
                        notes={notes} 
                        onSelect = {onSelect} 
                        selected={selected}/>
                </div>
                <div className="col-md-8">
                    {selected ? (
                        <NoteForm 
                            note={selected}
                            onChange={setSelected}
                            onSubmit={onSubmit}
                            onCancel={onCancel}
                        />
                    ) : (
                        <div><button id="new-note" onClick={newNote}>New Note</button></div>
                    )}
                </div>
            </div>
        </div>
    )
}
