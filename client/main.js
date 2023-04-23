document.addEventListener(
    'DOMContentLoaded',

    function () {
        const btn = document.getElementById('btn');
        //C1
        async function handleDelete(ids) {
            for (const id of ids) {
                const res = await fetch(`http://localhost:4000/${id}`, {
                    method: 'DELETE',
                });
            }
        }
        //C2
        async function deleteItem(id) {
            const res = await fetch(`http://localhost:4000/${id}`, {
                method: 'DELETE',
            });
            return await res.json();
        }
        btn.onclick = async function () {
            const ids = [3, 4];
            //C1
            // await handleDelete(ids);
            //C2
            let data = [];
            for await (const id of ids) {
                const item = await deleteItem(id);
                data.push(item);
            }
            console.log(data);
        };
    },
    false,
);
