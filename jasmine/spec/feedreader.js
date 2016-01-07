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
        it('has a url defined for each RSS entry', function() {
            /* Loop through the array allFeeds and test that the url
             * property is defined and does not equal an empty
             * string
             */
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toEqual("");
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name defined for each RSS entry', function() {
            /* Loop through the array allFeeds and test that the name
             * property is defined and not empty
             */
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toEqual("");
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
            expect(isHidden).toBeTruthy();
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
            expect(bodyClass1).toBeFalsy();

            // Trigger click again, then recheck for applied class
            $('.menu-icon-link').trigger('click');
            var bodyClass2 = $('body').hasClass('menu-hidden');
            expect(bodyClass2).toBeTruthy();

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
            loadFeed(0, done);
        });

        it('should have at least one entry listed', function(done) {
            /* After the API data loads, check to see that there is some text
             * within the h2 element
             */
            var entry = $('.feed .entry').length;
            expect(entry).toBeGreaterThan(0);
            done();
        });

    }); // END describe 'Inital Entries'

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // This test is based on info and example from JohnnyMav from this post
        // https://discussions.udacity.com/t/new-feed-selection-question/16274/14

        /* Before testing (it/expect), load the second feed and store it's data
         * in the top-level scoped secondFeed variable. Call done() to signal
         * "it" that it can call the first feed and test the two feed's data
         * against each other
         */

        // Instantiate variables in 'describe' scope to hold
        var firstFeed,
            secondFeed;

        beforeEach(function(done) {
            // Load the second feed and hold it for the test
            loadFeed(1, function(){
                secondFeed = $('.feed').text();
            });
            // Tell "it" to go ahead and run
            done();
        });

        it('has changed its content', function(done) {
            /* load the first feed and set the returned data to the firstFeed
             * variable for readability
             */
            loadFeed(0, done);
            firstFeed = $('.feed').text();

            // test the two feeds agains each other, expecting data to change i.e. be different
            expect(firstFeed).not.toEqual(secondFeed);
        });


    }); //END describe 'New Feed Selection'

}());