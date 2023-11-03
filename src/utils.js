export function parse(output){
    const pattern = /{[\s\S]*}/;

    // Use the regex pattern to find the JSON object in the input string
    const match = output.match(pattern);

    if (match) {
        // Extract the matched JSON object
        const extractedJson = match[0];

        // Parse the JSON object
        try {
            return JSON.parse(extractedJson);
            
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return {}
        }
    } else {
        console.log("No JSON object found in the input string");
        return {}
}}



