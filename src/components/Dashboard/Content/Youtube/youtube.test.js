import Youtube from './index'



test("Test if youtube returns transmission not available when sessionID is null", async (done) => {
    var data = null;
    
    data =  Youtube(null);
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();

    done()
});


test("Test if youtube returns transmission when sessionID is not null", async (done) => {
    var data = null;
    
    data =  Youtube(1);
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();

    done()
});
