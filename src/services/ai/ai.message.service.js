const {GenerateContent} = require('../../utils/ai.model');

const generateMassageService = async (prompt) => {

    const dataByAi = await GenerateContent(prompt);
    return dataByAi;
}

  module.exports = {
    generateMassageService,
  };  
