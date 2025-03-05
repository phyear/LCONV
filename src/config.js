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
    social: {
        github: import.meta.env.VITE_SOCIAL_GITHUB,
        twitter: import.meta.env.VITE_SOCIAL_TWITTER,
        linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN,
        gitee: import.meta.env.VITE_SOCIAL_GITEE,
        wechat: import.meta.env.VITE_SOCIAL_WECHAT
    }
}

export default config;