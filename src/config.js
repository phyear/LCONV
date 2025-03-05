const config = {
    about : {
        technologies : JSON.parse(import.meta.env.VITE_ABOUT_TECHNOLOGIES),
     },
    contact: {
        email: import.meta.env.VITE_CONTACT_EMAIL,
        phone: import.meta.env.VITE_CONTACT_PHONE,
        address: import.meta.env.VITE_CONTACT_ADDRESS
    },
    changelog: {
       versions: JSON.parse(import.meta.env.VITE_CHANGELOG_VERSIONS)
    },
}

export default config;