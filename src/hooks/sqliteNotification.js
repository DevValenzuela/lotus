const getData = () => {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT last_date, title, type FROM Notify",
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    console.log(results.rows.item(0))
                }
            )
        })
    } catch (error) {
        console.log(error);
    }
}

const setData = async () => {
    let last_date = "12-08-2020"
    let title = "nuevo notification"
    if (last_date.length == 0 || title.length == 0) {
        alert('Please write your data.');
    } else {
        try {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "INSERT INTO Notify (last_date, title) VALUES (?,?)",
                    [last_date, title]
                );
            })
        } catch (error) {
            console.log(error);
        }
    }
}