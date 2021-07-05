const readline = require('readline');

module.exports = async (question) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const processadores = await rl.question(`${question}` , (answer) => {
      // TODO: Log the answer in a database
      //console.log(`Thank you for your valuable feedback: ${answer}`);
    
      rl.close();
      return answer;
    });

    console.log(processadores);
    return processadores;
}