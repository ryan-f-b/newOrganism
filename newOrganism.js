/* Context: You’re part of a research team that has found a new mysterious organism at the bottom of the ocean near hydrothermal vents. 
Your team names the organism, Pila aequor (P. aequor), and finds that it is only comprised of 15 DNA bases. The small DNA samples and 
frequency at which it mutates due to the hydrothermal vents make P. aequor an interesting specimen to study. However, P. aequor cannot 
survive above sea level and locating P. aequor in the deep sea is difficult and expensive. Your job is to create objects that simulate 
the DNA of P. aequor for your research team to study.

Look over the starter code. There are two helper functions: returnRandBase() and mockUpStrand().

DNA is comprised of four bases (Adenine, Thymine, Cytosine, and Guanine). When returnRandBase() is called, it will randomly select a base 
and return the base ('A','T','C', or 'G').

mockUpStrand() is used to generate an array containing 15 bases to represent a single DNA strand with 15 bases. */

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
};

let newStrand1 = mockUpStrand();
let newStrand2 = mockUpStrand();

// Creating a factory function to create an object
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // Mutate array will change one of the bases in the dna array with a new value (cannot be the same value)
    mutate() {
      while (true) {
        // Determining which element of the array to change
        let baseNumber = Math.floor(Math.random() * 15);
        // Determine which letter will replace the element
      let newBase = returnRandBase();
        // Checking if element values are the same and replacing if they are not
        if (this.dna[baseNumber] !== newBase) {
          this.dna[baseNumber] = newBase
          break;
        } 
      }
      return this.dna;
    },
    // The compareDNA method checks how many bases of the DNA match between this dna array and the dna array of the object passed as a parameter
    compareDNA(pAequor) {
      // Setting a count variable to count how many bases match
      let count = 0
      for (i = 0; i < this['dna'].length; i++) {
        // Looping through all the elements of the array and adding 1 to the count variable for all bases that match
        if (this.dna[i] == pAequor.dna[i]) {
          count += 1
        }
      }
      // Converting the count into a percentage of the array length
      let percentage = Math.round((count / this['dna'].length) * 100)
      // Retuning a string to give the result
      return `Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common`
    },
    // This method will check how many of the DNA string is either 'C' or 'G'. If it is over 60%, it will return true. Under 60% will return false.
    willLikelySurvive() {
      // Creating a count variable to count the 'C' or 'G' bases
      let count = 0
      // Looping through the array to check for 'C' and 'G', and adding them to the count
      for (var element of this.dna) {
        if (element === 'C' || element === 'G') {
          count += 1
        }
      }
      // Calculating a percentage based on the count
      let percentage = Math.round((count / this['dna'].length) * 100);
      // Returning true or false
      if (percentage >= 60) {
        return true
      } else {
        return false
      }
    },
    // Creating a new method to return the complementary version of the this.dna array. The rules are that 'A's match with 'T's and vice versa. Also, 'C's match with 'G's and vice versa.
    complementStrand() {
      // Creating the new array to be returned
      let newArr = [];
      // Creating a for statement to loop through the dna array
      for (i = 0; i < this['dna'].length; i++) {
        // Pushing the corresponding base to the new array
        if (this.dna[i] === 'A') {
          newArr.push('T');
        } else if (this.dna[i] === 'T') {
          newArr.push('A');
        } else if (this.dna[i] === 'G') {
          newArr.push('C');
        } else {
          newArr.push('G');
        }
      }
      // Returning the new array
      return newArr;  
    }
  }
};

// Creating a new function to generate a pool of 30 DNA strands that have a return true when passed through willLikelySurvive
function generatePool() {
  let array = [];
  let i = 0
  while (array.length < 30) {
    let temp = pAequorFactory(i, mockUpStrand())
    if (temp.willLikelySurvive() == true) {
      array.push(temp);
      i++
    }
  }
  return array;
};

// Assigning the generatePool() function to a variable 
const pAequor = generatePool();