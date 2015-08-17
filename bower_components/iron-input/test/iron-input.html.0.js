

    suite('basic', function() {

      test('setting bindValue sets value', function() {
        var input = fixture('basic');
        input.bindValue = 'foobar';
        assert.equal(input.value, input.bindValue, 'value equals to bindValue');
      });

      test('changing the input triggers an event', function(done) {
        var input = fixture('basic');

        input.addEventListener('bind-value-changed', function(value) {
          assert.equal(input.value, input.bindValue, 'value equals to bindValue');
          done();
        });

        input.value = "foo";
        input._onInput();
      });

      test('default value sets bindValue', function() {
        var input = fixture('has-value');
        assert.equal(input.bindValue, input.value, 'bindValue equals value');
      });

      test('default bindValue sets value', function() {
        var input = fixture('has-bind-value');
        assert.equal(input.value, input.bindValue, 'value equals to bindValue');
      });

      test('set bindValue to undefined', function() {
        var scope = document.getElementById('bind-to-object');
        scope.foo = undefined;
        assert.ok(!scope.$.input.bindValue, 'bindValue is falsy');
        assert.ok(!scope.$.input.value, 'value is falsy');
      });

      test('validator used instead of constraints api if provided', function() {
        var input = fixture('has-validator')[1];
        input.value = '123';
        input.validate();
        assert.isTrue(input.invalid, 'input is invalid');
      });

      test('prevent invalid input works in _onInput', function() {
        var input = fixture('prevent-invalid-input');
        input.value = '123';
        input._onInput();
        assert.equal(input.bindValue, '123');

        input.value = '123foo';
        input._onInput();
        assert.equal(input.bindValue, '123');
      });
    });

  