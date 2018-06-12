(function(){
    var st = {
        parent             : 'main.cursos',
        form               : 'form.formulario',
        elInputName        : 'input[name="course_name"]',
        elInputDescription : 'textarea[name="course_description"]',

        editIcon           : '.tarjeta .opciones .editar',
        deleteIcon         : '.tarjeta .opciones .eliminar',

        listadoCourses     : '.listado',

        courseIdEdition    : null,
        courses            : [],
        lastIdCourse       : 0
    };

    var dom = {};

    var catchDom = function() {
        dom.parent             = $(st.parent);
        dom.form               = $(st.form, dom.parent);
        dom.elInputName        = $(st.elInputName, dom.form);
        dom.elInputDescription = $(st.elInputDescription, dom.form);

        dom.listadoCourses     = $(st.listadoCourses, dom.parent);
    }

    var suscribeEvents = function() {
        dom.form.on('submit', events.addNewCourse);
        $(document).on("click", st.editIcon, events.editCourse);
        $(document).on("click", st.deleteIcon, events.deleteCourse);
    }

    var events = {
        addNewCourse(e) {
            e.preventDefault();

            var isValidId = Number.isInteger(st.courseIdEdition);

            if (!isValidId) {
                var newCourse = {
                    id          : st.lastIdCourse + 1,
                    name        : dom.elInputName.val(),
                    description : dom.elInputDescription.val()
                }

                st.courses.push(newCourse);
            }
            else {
                var course = fn.getCourseById(st.courseIdEdition);

                course.name        = dom.elInputName.val();
                course.description = dom.elInputDescription.val();
            }

            fn.printCourses(st.courses);

            dom.elInputName.val('');
            dom.elInputDescription.val('');
            st.courseIdEdition = null;
        },
        editCourse() {
            var id     = $(this).data('id');
            var course = fn.getCourseById(id);

            st.courseIdEdition = id;

            dom.elInputName.val(course.name);
            dom.elInputDescription.val(course.description);
        },
        deleteCourse() {
            var id     = $(this).data('id');

            st.courses.filter((course, index) => {
                if (course.id == id) {
                    st.courses.splice(index, 1);
                }
            });

            fn.printCourses(st.courses);
        }
    }

    var fn = {
        printCourses(courses) {
            dom.listadoCourses.empty();
            $.each(courses, function(index, course) {
                var newHtml = fn.getNewCourse(course);

                dom.listadoCourses.append(newHtml);
                st.lastIdCourse = course.id;
            });
        },
        getCourseById(id) {
            return st.courses.filter((course) => course.id == id)[0];
        },
        getNewCourse(course) {
            return `<article class="tarjeta">
                        <header>
                            <div class="title">
                                <span>${ course.id }</span>
                                <h1>${ course.name }</h1>
                            </div>
                            <div class="opciones">
                                <a href="javascript:;" class="editar" data-id="${ course.id }">
                                    <img src="img/EditarBlanco.png" alt="Icono">
                                </a>
                                <a href="javascript:;" class="eliminar" data-id="${ course.id }">
                                    <img src="img/EliminarBlanco.png" alt="Icono">
                                </a>
                            </div>
                        </header>
                        <div class="descripcion">
                            <p>${ course.description }</p>
                        </div>
                    </article>`;
        },
        getCoursesDefault() {
            return [
                {
                    id          : 1,
                    name        : 'HTML desde cero',
                    description : 'Curso resumido para conocer el lenguaje de marcado empleado por nuestros navegadores.'
                },
                {
                    id          : 2,
                    name        : 'Git',
                    description : 'Es un software de control de versiones.'
                },
                {
                    id          : 3,
                    name        : 'Diseño gráfico',
                    description : 'Aprende con nosotros herramientas que te facilitarán expresar tu ideas gráficas.'
                }
            ];
        },
        configModule() {
            st.courses = fn.getCoursesDefault();
            fn.printCourses(st.courses);
        }
    }

    function initialize() {
        catchDom();
        suscribeEvents();

        fn.configModule(st.courses);
    }

    initialize();
})();
