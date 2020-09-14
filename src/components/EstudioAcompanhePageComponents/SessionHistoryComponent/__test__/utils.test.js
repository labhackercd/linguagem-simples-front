
import FormatStringData from './../utils'

describe('Test Format Date function requisitions', () => {
 
  it("Test if it returns as expected in correct format", async () => {
    var date = FormatStringData("2020-08-05")
    
    expect(date).not.toBeNull();
    expect(date).toEqual("05/08");
  });

  it("Test if it returns empty string if a null date is passed", async () => {
    var date = FormatStringData(null)
    
    expect(date).not.toBeNull();
    expect(date).toEqual("");
  });

  it("Test if it returns empty string  if a empty string date is passed", async () => {
    var date = FormatStringData("")
    
    expect(date).not.toBeNull();
    expect(date).toEqual("");
  });

});

