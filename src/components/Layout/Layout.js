import React from 'react';
import Container from 'react-bootstrap/Container';

const layout = (props) => {
    return (
        <Container>
            <main>
                {props.children}
            </main>
        </Container>
    )
}
export default layout;