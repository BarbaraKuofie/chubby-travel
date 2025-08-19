import { text } from "stream/consumers"

const styles = {
    container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
    gap: '2rem',
    padding: '3rem',
},
card: {
    // maxWidth: 600,
    height: '90vh',
    border: 'none',
	boxShadow: 'none',
	display: 'flex',
	flexDirection: 'column',
},
cardMedia: {
    minHeight: "60vh",
    height: '60vh',
},
cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
},
cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
}
}
export const classes = styles