import { createSlice } from '@reduxjs/toolkit';
import characterData from 'data/example-data.json';

const initialState = {
    characters: characterData,
};

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        remove: (state, action) => {
            state.characters = state.characters
                .map((character) => {
                    return searchCharacter(character, action.payload);
                })
                .filter(Boolean); // Remove undefined values
        },
    },
});

function searchCharacter(character: any, id: string) {
    if (character.data.ID === id) {
        // remove character
        return;
    } else {
        const keys = Object.keys(character.children);

        // Check if children object is empty
        if (keys.length === 0) {
            // Keep character
            return character;
        } else {
            // Keep character and search children
            // Loop through keys
            keys.forEach((key) => {
                // Loop through children
                character.children[key].records = character.children[
                    key
                ].records
                    .map((child: any) => {
                        return searchCharacter(child, id);
                    })
                    .filter(Boolean); // Remove undefined values
            });

            return character;
        }
    }
}

export const { remove } = charactersSlice.actions;

export default charactersSlice.reducer;
