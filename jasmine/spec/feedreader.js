/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has a url', function() {
            /* Loop through the array allFeeds and test that the url
             * property is defined and matches the 'http://' string to
             * determine it is a url
             */
            for(var i = 0, len = allFeeds.length; i < len; i++ ) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toMatch("http://");
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has a name', function() {
            /* Loop through the array allFeeds and test that the name
             * property is defined and not empty
             */
            for(var i = 0, len = allFeeds.length; i < len; i++ ) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toMatch(null);
            }
         });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
            /* Select body element and determine that the menu-hidden
             * class is applied to it
             */
            var isHidden = $('body').hasClass('menu-hidden');
            expect(isHidden).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('toggles on and off screen when icon clicked', function() {
            /* Since isHidden is true in the test above, triggering the first click
             * should return false indicating its now visible while a second trigger
             * event should return a true value indicating the menu is again hidden.
             */
            // Trigger click event on anchor tag
            $('.menu-icon-link').trigger('click');

            // Determine if body element still has menu-hidden class applied then test
            var bodyClass1 = $('body').hasClass('menu-hidden');
            expect( bodyClass1 ).not.toBe(true);

            // Trigger click again, then recheck for applied class
            $('.menu-icon-link').trigger('click');
            var bodyClass2 = $('body').hasClass('menu-hidden');
            expect( bodyClass2 ).toBe(true);

          });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         /* Load the data for the page before testing it; setting callback to
          * the Jasmine done() function
          */
        beforeEach(function(done) {
            loadFeed(0, done );
        });

        it('should have at least one entry listed', function(done) {
         /* After the API data loads, check to see that there is some text
          * within the h2 element
          */
            var entry = $('.entry > h2').text().length;
            expect(entry).toBeGreaterThan(0);
            done();
        });

    });// END describe 'Inital Entries'

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        /* Before firing the test, get the link of the current first entry (Jquery
         * loads selected elements in document order - implemented since Jquery 1.3.2
         * http://blog.jquery.com/2009/02/20/jquery-1-3-2-released/
         *
         * Then load a new feed and get its first entry's href attribute to test
         * against the previous entry's href attribute.
         */
        beforeEach(function(done, currentHref) {
            // Get the href of the current anchor from prior test's call
            var currentHref = $('.entry-link').attr('href');

            loadFeed(1, done );
        });

        it('has changed its content', function(done, currentHref) {
         /* Get the href of the newly loaded data and compare it against
          * the previous value passed in from the beforeEach function
          */
            var newHref = $('.entry-link').attr('href');

            expect(newHref).not.toEqual(currentHref);
            done();
        });


    });//END describe 'New Feed Selection'

}());