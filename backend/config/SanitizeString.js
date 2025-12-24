const SanitizeString=(tagsString)=>{

 const val=tagsString
 .split(",")
 .map(tag => tag.trim())
 .filter(tag => tag !== "")
 .map(tag => tag.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase());
    return val
}

module.exports=SanitizeString;