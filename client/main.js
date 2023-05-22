const btn = document.getElementById('btn');
async function handleDelete(ids) {
    const promises = [];
    for (const id of ids) {
        const res = await fetch(`http://localhost:5000/${id}`, {
            method: 'DELETE',
        });
        const item = await res.json();
        promises.push(item);
    }
    return promises;
}
async function deleteItem(id) {
    const res = await fetch(`http://localhost:5000/${id}`, {
        method: 'DELETE',
    });
    return await res.json();
}
btn.addEventListener('click', async () => {
    //C1 63ms
    console.time('time');
    const responses = await handleDelete([1, 2, 3]);
    Promise.all(responses).then((data) => {
        console.log(data);
        console.timeEnd('time');
    });

    //C2: 100ms
    // const ids = [1, 2, 3];
    // for (const id of ids) {
    //     const item = await deleteItem(id);
    //     console.log(item);
    // }
});
