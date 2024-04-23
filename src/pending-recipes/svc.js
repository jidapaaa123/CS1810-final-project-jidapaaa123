export const GuidString = async () => {
    // if something goes wrong, check this url
    const url = "http://localhost:5185/NewGuid";

    const result = await fetch(url);
    console.log(result.body);
    const guid = await result.json();
    console.log(result);
    return guid;
}

GuidString();