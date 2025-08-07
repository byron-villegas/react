
const onRowMouseMove = (e) => {
    e.currentTarget.classList.add('hovered');
};

const onRowMouseLeave = (e) => {
    e.currentTarget.classList.remove('hovered');
};

const Table = { onRowMouseMove, onRowMouseLeave };

export default Table;