// requires ../util/test.js
// requires oopsie.js

( () => {
    const ok = [];

    const player1 = Player("Dierk");
    const player2 = Player("Florian");

    function assertIndexes(a,b,c,d) {
        ok.push(player1.getFallbackIndex() === a);
        ok.push(player1.getProgressIndex() === b);
        ok.push(player2.getFallbackIndex() === c);
        ok.push(player2.getProgressIndex() === d);
    }

    assertIndexes(0,0,0,0); // start positions // test 0-3

    player1.proceed(1);
    assertIndexes(0,1,0,0); // test 4-7
    player1.turn();
    assertIndexes(1,1,0,0);// test 8-11

    player2.proceed(2);
    assertIndexes(1,1,0,2);// test 12-15
    player2.proceed(2);

    assertIndexes(1,1,0,4);//// test 16-19
    player2.turn();
    assertIndexes(1,1,4,4); // test 20-23

    player1.proceed(2);
    assertIndexes(1,3,4,4); // test 24 - 27
    player1.fallback();
    assertIndexes(1,1,4,4); // test 28 - 31

    report("oopsie-indexes", ok);
}) ();
